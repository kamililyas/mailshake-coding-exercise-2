import {Constants} from '../config/constants';
import * as PaginationModel from '../models/pagination';
import {Pagination} from '../types/pagination';
const fs = require('fs');
const fetch = require('node-fetch');

export const fetchRequest =
    async (url: string, filenamePrefix: string, entityType: any = null) => {
      try {
        // Fetch request and parse as JSON
        const response = await fetch(url);
        const data: string = await response.json() as string;

        // Extract the url of the response's "next" link
        let nextPage = '';
        if (JSON.parse(JSON.stringify(data))['next'] !== null &&
            typeof JSON.parse(JSON.stringify(data))['next'] !==
            typeof undefined) {
          nextPage = JSON.parse(JSON.stringify(data))['next'] as string;
        }

        const link = new URL(url);
        const page = parseInt(String(link.searchParams.get('page')));
        console.log('Current Page: ' + JSON.stringify(page));

        // Append data of page if it exists
        if (page) {
          fs.writeFileSync(Constants.responseOutputDir +
              filenamePrefix + page +
              Constants.responseOutputExtension, JSON.stringify(data));

          // If page is first store it pagination start info
          if (page === 1) {
            const parsedData = JSON.parse(JSON.stringify(data));
            const newPagination: Pagination = {
              'id': 1000,
              'page': page,
              'page_size': 0,
              'total_records': (parsedData['count'] !== null &&
                  typeof parsedData['count'] !== typeof undefined) ?
                  parsedData['count'] : 0,
              'initiatable_type': entityType,
              'batch_status': (nextPage) ?
                  Constants.paginationBatchInProgress :
                  Constants.paginationBatchCompleted,
            };
            PaginationModel.create(newPagination, (err: Error) => {
              if (err) {
                console.log(err);
              }

              // Success case
            });
          } else {
            PaginationModel.findByType(entityType,
                Constants.paginationBatchInProgress,
                (err: Error, pagination: any) => {
                  if (err) {
                    console.log(err);
                  }

                  // Success case
                  if (typeof pagination !== typeof undefined) {
                    pagination.page = page;
                    PaginationModel.updatePage(pagination, (err: Error) => {
                      if (err) {
                        console.log(err);
                      }

                      // Success case
                    });
                  }
                });
          }
        }

        // If another page exists, generate its output recursively
        console.log('Next Page: ' + nextPage);
        if (nextPage) {
          await fetchRequest(nextPage, filenamePrefix, entityType);
        } else {
          // If another page is not present
          // then close the pagination for this instance
          PaginationModel.findByType(entityType,
              Constants.paginationBatchInProgress,
              (err: Error, pagination: any) => {
                if (err) {
                  console.log(err);
                }

                // Success case
                if (typeof pagination !== typeof undefined) {
                  pagination.batch_status = Constants.paginationBatchCompleted;
                  PaginationModel.updateBatchStatus(pagination,
                      (err: Error) => {
                        if (err) {
                          console.log(err);
                        }

                        // Success case
                      });
                }
              });
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    };

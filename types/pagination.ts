

export interface BasicPagination {
    id: number,
}

export interface Pagination extends BasicPagination {
    page: number,
    page_size: number,
    total_records: number,
    initiatable_type: string,
    batch_status: string
}

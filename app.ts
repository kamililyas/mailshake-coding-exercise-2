import * as dotenv from 'dotenv';
import * as AppService from './services/AppService';

dotenv.config();

AppService.initiate();

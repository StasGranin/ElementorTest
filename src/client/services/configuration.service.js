"use strict";

import {CONFIGURATION_API, fetchAPI} from './api.service';

export const getConfiguration = () => fetchAPI(CONFIGURATION_API + '/getConfiguration');
"use strict";

import {USERS_API, fetchAPI} from './api.service';

export const getActiveUsers = () => fetchAPI(USERS_API + '/getActiveUsers');
"use strict";

import {USERS_API, fetchAPI} from './api.service';

export const getActiveUsers = () => fetchAPI(USERS_API + '/getActiveUsers');
export const getActiveSessionDetails = (sessionId) => fetchAPI(`${USERS_API}/getActiveSessionDetails/${sessionId}`);
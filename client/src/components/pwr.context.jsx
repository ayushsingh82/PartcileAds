// src/shared/services/pwr.context.tsx

import { createContext } from 'react';
import PwrService from './pwr.service';

// @ts-expect-error - will be initialized in App entry point
const PwrSvcContext = createContext(null);

export default PwrSvcContext;

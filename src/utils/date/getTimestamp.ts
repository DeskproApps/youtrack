import isDate from "date-fns/isDate";
import isValid from "date-fns/isValid";
import getTime from "date-fns/getTime";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTimestamp = (date?: any): number|null => {
    if (isDate(date) && isValid(date)) {
        return getTime(date);
    }

    return null;
};

export { getTimestamp };

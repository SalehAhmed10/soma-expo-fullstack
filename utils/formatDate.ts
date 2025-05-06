import { format, isValid } from 'date-fns';

export const formatDate = (date: string | number | Date, formatString: string = 'MMMM dd, yyyy'): string => {
    try {
        const parsedDate = new Date(date);

        if (!isValid(parsedDate)) {
            console.error("Invalid date provided:", date);
            return 'N/A';
        }

        return format(parsedDate, formatString);
    } catch (error) {
        console.error("Error formatting date:", error);
        return 'N/A';
    }
};
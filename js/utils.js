/**
 * Logic Engine - Utility Module
 */

const utils = {
    /**
     * Groups an array of objects by a specific key.
     * @param {Array} array - The array to group.
     * @param {String} key - The object key to group by.
     * @returns {Object} An object containing the grouped data.
     */
    groupBy: (array, key) => {
        return array.reduce((result, currentValue) => {
            // Extract the value to group by
            const groupKey = currentValue[key];
            
            // If the group doesn't exist, create it
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            
            // Add the current object to the group
            result[groupKey].push(currentValue);
            
            return result;
        }, {});
    },

    /**
     * Creates a debounced function that delays invoking the provided function
     * until after `wait` milliseconds have elapsed since the last time it was invoked.
     * @param {Function} func - The function to debounce.
     * @param {Number} wait - The number of milliseconds to delay.
     * @returns {Function} The new debounced function.
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Transforms grouped data into Chart.js friendly format (labels and data arrays)
     * @param {Object} groupedData - Data grouped by groupBy function
     * @param {String} valueKey - The key to sum/extract for the chart data
     * @returns {Object} { labels: [], data: [] }
     */
    prepareChartData: (groupedData, valueKey) => {
        const labels = Object.keys(groupedData);
        const data = labels.map(label => {
            return groupedData[label].reduce((sum, item) => sum + item[valueKey], 0);
        });
        
        return { labels, data };
    }
};

// Make it available globally
window.utils = utils;

export function applyOptionOrder(options: any[], optionOrder: string[]): any[] {
    if (!optionOrder || optionOrder.length === 0) {
        return options;
    }

    const lowerOrder = optionOrder.map((o) => String(o).toLowerCase());

    return options.sort((a: {value: string}, b: {value: string}) => {
        let indexA = lowerOrder.indexOf(String(a.value).toLowerCase());
        let indexB = lowerOrder.indexOf(String(b.value).toLowerCase());
        if (indexA === -1) {
            indexA = 9999;
        }
        if (indexB === -1) {
            indexB = 9999;
        }
        return indexA - indexB;
    });
}

export function applyFilterOptions(options: any[], filterOptions: string[]): any[] {
    if (!filterOptions || filterOptions.length === 0) {
        return options;
    }

    const lowerFilter = filterOptions.map((o) => String(o).toLowerCase());
    return options.filter((o: {value: string}) => {
        return lowerFilter.indexOf(String(o.value).toLowerCase()) > -1;
    });
}


class Optional {
    protected value: any;

    constructor(value: any) {
        this.value = value;

        if (typeof this.value === 'object' &&
            this.value !== null) {

            return new Proxy(this.value, {
                get(target, name, receiver) {
                    return Reflect.get(target, name, receiver);
                }
            });
        }
    }
}

/**
 * A small helper function based on Laravel's optional helper function
 */
export function optional(value: any = null, callback: any = null) {
    if (callback === null) {
        return new Optional(value);
    }
    else if (value !== null) {
        return callback(value);
    }
}

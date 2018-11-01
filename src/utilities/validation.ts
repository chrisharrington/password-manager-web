export enum Rules {
    Required
}

export class Value {
    rules: Rule[];
    label: string;
    value: string;
    errorMessage: string;

    constructor(label: string, ...rules: Rules[]) {
        this.label = label;
        this.rules = rules.map(r => this.build(r, label));
        this.value = '';
    }

    validate(value: string) {
        
    }

    get() {
        return this.value;
    }

    set(value: string) {
        this.value = value;
    }

    error() {
        return this.errorMessage;
    }

    private build(rule: Rules, label: string) : Rule {
        switch (rule) {
            case Rules.Required:
                return new Rule((value: string) => !!value, `The ${label} is required.`);
        }
    }
}

class Rule {
    validator: (value: string) => boolean;

    constructor(validator: (value: string) => boolean, error: string) {
        this.validator = validator;
    }

    validate(value: string) : boolean {
        return this.validator(value);
    }
}
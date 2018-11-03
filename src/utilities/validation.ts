export enum Rules {
    Required,
    EmailAddress
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

    validate() : string | null {
        let rule = this.rules.find(rule => !!rule.validate(this.value));
        this.errorMessage = rule ? rule.error : '';
        return rule ? rule.error : null;
    }

    get() {
        return this.value;
    }

    set(value: string) {
        this.value = value;
        return this;
    }

    error() {
        return this.errorMessage;
    }

    private build(rule: Rules, label: string) : Rule {
        switch (rule) {
            case Rules.Required:
                return new Rule((value: string) => !!value, `The ${label} is required.`);
            case Rules.EmailAddress:
                return new Rule((value: string) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value), `The ${label} is not valid.`);
        }
    }
}

class Rule {
    validator: (value: string) => boolean;
    error: string;

    constructor(validator: (value: string) => boolean, error: string) {
        this.validator = validator;
        this.error = error;
    }

    validate(value: string) : string | null {
        return this.validator(value) ? null : this.error;
    }
}
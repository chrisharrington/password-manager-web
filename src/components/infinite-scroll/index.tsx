import * as React from 'react';

export interface IInfiniteScrollProps {
    initialCount?: number | undefined;
    count: number;
    get: (start: number, count: number) => Promise<any[]>
    build: (model: any) => JSX.Element
}

interface IInfiniteScrollState {
    models: any[]
}

export default class InfiniteScroll extends React.Component<IInfiniteScrollProps, IInfiniteScrollState> {
    onScrollHandler: () => {};
    start: number;
    count: number;
    loading: boolean;
    more: boolean;
    mounted: boolean;

    constructor(props) {
        super(props);

        this.onScrollHandler = this.onScroll.bind(this);

        this.state = {
            models: []
        };
    }

    getModels() {
        return this.state.models;
    }

    setModels(models: any[]) {
        // This is done to stop InfiniteScroll's subscription to the scroll event, otherwise setting the state would throw a warning.
        window.removeEventListener('scroll', this.onScrollHandler);
        this.mounted = false;

        this.setState({
            models: models
        });

        // Resume the subscription
        window.addEventListener('scroll', this.onScrollHandler);
        this.mounted = true;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScrollHandler);

        this.mounted = true;
        this.update();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollHandler);

        this.mounted = false;
    }

    async update() {
        this.start = 0;
        this.count = this.props.initialCount || this.props.count;
        this.loading = false;
        this.more = true;

        await this.get(true);
    }

    async refresh() {
        let oldCount = this.count,
            oldMore = this.more;

        this.count = this.start;
        this.start = 0;
        this.more = true;
        this.loading = false;

        await this.get(true);
        this.count = oldCount;
        this.more = oldMore;
    }

    async onScroll() {
        let body = document.body,
            html = document.documentElement as HTMLElement,
            pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

        if (pageHeight - window.scrollY >= 1400)
            return;

        await this.get();
    }

    async get(clear: boolean = false) {
        if (this.loading || !this.more || !this.props.get)
            return;

        this.loading = true;

        let models = await this.props.get(this.start, this.count);

        this.mounted && this.setState({
            models: clear ? models : this.state.models.concat(models)
        }, () => {
            this.more = models.length === this.count;
            if (this.more)
                this.start = (isNaN(this.start) ? 0 : this.start) + this.count;
            this.loading = false;
        });
    }

    render() {
        return this.state.models && this.state.models.length > 0 ?
            this.state.models.map(this.props.build.bind(this)) :
            null;
    }
}
export class Task {
    time: string;
    state: string;
    title: string;

    constructor(
        time: string,
        state: string,
        title: string
    ) {
        this.time = time;
        this.state = state;
        this.title = title;
    }
}

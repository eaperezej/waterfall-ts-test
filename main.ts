import { from, Observable } from "rxjs";
import { concatMap } from "rxjs/operators";
import * as request from "request-promise-native";

function test(): void {
    const ids: Array<any> = [1, 2, 3];

    const items: Observable<any> = from(ids).pipe(concatMap((id) => {
        const baseUrl = `https://jsonplaceholder.typicode.com/todos/${id}`;

        return from(request.get({
            uri: baseUrl
        }));
    }));

    console.log("init");

    items.subscribe({
        next: (item) => {
            console.log(item);
        },
        error: (e) => {
            console.log(e);
        },
        complete: () => {
            console.log("finish");
        }
    });
}

test();

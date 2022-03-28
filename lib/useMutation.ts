import { useState } from "react";

type MutationTuple<Body, Data> = [MutateFunction<Body, Data>, MutateResult<Data>];

type MutateFunction<Body, Data> = (opts: MutateFunctionOptions<Body, Data>) => Promise<void>;

type MutateFunctionOptions<Body, Data> = {
    body?: Body;
    onSuccess?: (data: Data) => Promise<void>;
};

type MutateResult<Data> = {
    loading: boolean;
    data: Data;
    error: Error;
}

const useMutation = <Body = any, Data = any>(method: string, path: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data>(null);
    const [error, setError] = useState<Error>(null);

    const mutateFunction: MutateFunction<Body, Data> = async ({ body, onSuccess }) => {
        try {
            setLoading(true);
            const res = await fetch(path, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body && JSON.stringify(body),
            });

            const isJSON = res.headers.get("content-type")?.indexOf("application/json") !== -1;
            setLoading(false);
            if (res.ok) {
                const data = isJSON ? await res.json() : null;
                setData(data);
                if (onSuccess) {
                    await onSuccess(data);
                }
            } else {
                if (isJSON) {
                    const json = await res.json();
                    const message = json?.error;
                    setError(Error(message));
                } else {
                    setError(Error(await res.text()));
                }
            }
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };


    const result: MutationTuple<Body, Data> = [mutateFunction, { loading, data, error }];
    return result;
};

export default useMutation;

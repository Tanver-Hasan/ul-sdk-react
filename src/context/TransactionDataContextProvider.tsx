import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface IClient {
    id: string;
    name: string;
};
interface IOrganization {
    id: string;
    name: string;
};
interface ITenant {
    name: string;
    friendly_name: string;
};


export interface IError {
    [x: string]: any;
    code: string;
    message: string;
    field: string;
}

export interface ICaptcha {
    enabled: boolean;
    metadata: Record<string, string>;
}


const TransactionDataContext = createContext({
    state: '',
    prompt: '',
    screen: '',
    local: '',
    client: { id: '', name: '' } as IClient,
    tenant: {name : '' , friendly_name : ' '} as ITenant,
    organization: { id: '', name: '' } as IOrganization,
    captcha: { enabled: false, metadata: {} } as ICaptcha,

    getLink: (_name: string): string => '',
    getAction: (_name: string): string => '',
    getSubmittedFormData: (_name: string): string => '',
    getTransactionParams: (_name:string): string =>'',
    getPromptErrors: (): IError[] => [],
    getFieldErrors: (_field: string): IError[] => [],
    
})

export const TransactionDataContextProvider = (props: PropsWithChildren) => {
    const transaction_data = (window as any).window.universal_login_transaction_data;
    const state = transaction_data.state;
    const prompt = transaction_data.prompt.name;
    const screen = transaction_data.screen.name;
    const local= transaction_data.local;
    const captcha: ICaptcha = transaction_data.captcha;
    const client: IClient = transaction_data.client;
    const tenant: ITenant= transaction_data.tenant;
    const organization: IOrganization= transaction_data.organization;
    const links: Record<string, string> = transaction_data.links;
    const actions: Record<string, string> = transaction_data.actions;
    const unsafe_data = transaction_data.unsafe_data;
    const submitted_form_data: Record<string, string> = unsafe_data.submitted_form_data;
    const transaction_params: Record<string,string>= unsafe_data.transaction_params;
    const [errors, setErrors] = useState<IError[]>(transaction_data.errors);



    const getLink = function (name: string) {
        return links[name] ?? '';
    };

    const getSubmittedFormData = (name: string) => {
        return submitted_form_data[name] ?? '';
    }

    const getTransactionParams=(name:string)=>{
        return transaction_params[name];
    }

    const getAction = function (name: string) {
        return actions[name] ?? '';
    };
    const getPromptErrors = function () {
        return errors.filter((error) => !error.usedField);
    };

    // we set a flag of usedField to true for each error that is returned
    // this allows the above promptErrors to act as a catchall if a field
    // hasn't yet been implemented
    const getFieldErrors = function (field: string) {
        let updatedField = false;
        const newErrors: IError[] = errors
            .filter((error) => error.field === field)
            .map((error) => {
                if (error.usedField) return error;
                updatedField = true;
                return {
                    ...error,
                    usedField: true,
                };
            });

        // Only update the state if something has changed or else we'd
        // end up in an infinite loop
        if (updatedField) {
            setErrors(newErrors);
        }

        return newErrors;
    };

    useEffect(() => {
        console.log('Transaction Data :', transaction_data);
    
    }, [transaction_data]);

    return (
        <TransactionDataContext.Provider
            value={{
                state,
                prompt,
                screen,
                local,
                client,
                tenant,
                organization,
                captcha,
                getLink,
                getSubmittedFormData,
                getTransactionParams,
                getAction,
                getFieldErrors,
                getPromptErrors
            }}
        >
            {props.children}
        </TransactionDataContext.Provider>
    )
}




export default TransactionDataContext;


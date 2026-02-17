/// <reference types="node" />

declare namespace qoa {
    type QoaMethods =
        | "prompt"
        | "confirm"
        | "hidden"
        | "input"
        | "interactive"
        | "keypress"
        | "quiz"
        | "secure"
        | "config"
        | "prefix"
        | "underlineQuery"
        | "clearScreen";

    interface QoaConstructor {
        new <TTypes extends string = QoaMethods>(): Qoa<TTypes>;
    }

    interface SecureParams {
        type: string;
        query: string;
        handle: string;
    }

    interface ConfigParams {
        prefix: string;
        underlineQuery: boolean;
    }

    interface QoaBase<TTypes extends string = QoaMethods> {
        /**
         * Type: Function
         * Async: True
         * Returns: Object
         * @description Create and display a secure prompt.
         * @param type {string} "secure" Indicates the type of the prompt. The option is **mandatory** when it is part of the configuration object inside the array passed to `qoa.prompt()` function. Can be considered **optional** when it is part of the object passed to the `qoa.secure()` function.
         * @param query {string} The query to be displayed by the prompt.
         * @param handle {string} The name of the attribute under which the prompt result will be saved, inside the returned object.
         */
        secure(params: SecureParams): object;
        /**
         * Type: Function
         * Async: False
         * @description Collectively configure a qoa instance.
         * @param prefix {string} "" A string to be included as prefix to the query of each prompt.
         * @param underlineQuery {boolean} default false Underline the query of each prompt.
         */
        config(params: ConfigParams): void;
        /**
         * Type: Function
         * Async: False
         * @description Add a string as prefix to the query of each prompt belonging to the targeted qoa instance.
         * @param status {string} A string to be included as prefix to the query of each prompt.
         */
        prefix(str: string): void;
        /**
         * **Type**: Function
         * **Async**: False
         * @description Underline the query of each prompt belonging to the targeted qoa instance.
         * @param status {string} Underline the query of each prompt.
         */
        underlineQuery(status: boolean): void;
        /**
         * **Type**: Function
         * **Async**: False
         * @description Move the cursor to the top-left corner of the console and clear everything below it.
         */
        clearScreen(): void;
    }

    type Qoa<TTypes extends string = QoaMethods> = QoaBase<TTypes>;
}

declare const qoa: qoa.Qoa & {
    Qoa: qoa.QoaConstructor;
    QoaMethods: qoa.QoaMethods;
};

export = qoa;
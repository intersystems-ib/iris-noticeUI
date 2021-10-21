export interface Subscriber {
    _id: number;
    Name: string;
    SurName: string;
    Active: boolean;
    Lang: string;
    EmployeeId: number;
    Email: string;
    NumSubscriptions: number;
    PullNotifications: number;
    PushNotifications: number;
}

export interface Language {
    _id: string;
    ISO: string;
    Description: string;
}

export interface IdentificationNumber {
    _id: number;
    Type: string;
    Code: string;
}

export interface ContactWay {
    _id: number;
    Type: string;
    Address: string;
}

export interface Subscription {
    _id: number;
    Topic: string;
}

export interface Notification {
    _id: number;
    Date: string;
    Type: string;
    Text: string;
}
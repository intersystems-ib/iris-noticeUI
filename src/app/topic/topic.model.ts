export interface Topic {
    _id: number;
    _class: string;
    TopicKey: string;
    Template: string;
    TemplateMsg: string;
    BotName: string;
    ContactWay: string;
    Format: string;
    Destination: string;
    Active: boolean;
    Subject: string;
    SubjectMsg: string;
    OutboundAdapter: string;
    BodyFormat: string;
    BodyTemplate: string;
    ExecutionComponent: string;
    Notifications: number;
}
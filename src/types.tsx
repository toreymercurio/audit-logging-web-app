type AppType = {
    id: number;
    name: string;
}

type ObjectType = {
    id: number;
    name: string;
}

type App = {
    id: string;
    appType?: AppType;
    name?: string;
    jsonMessage?: string;
    customerUrl?: string;
    internalUrl?: string;
    adminUrl?: string;
    costCenter?: number;
    sox?: boolean;
    owner?: string;
    teamOwner?: string;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    updatedBy?: string;
    isDeleted?: boolean;
    isArchived?: boolean;
}

type AuditLog = {
    id: number;
    app: App;
    parentObjectId?: string;
    parentObjectType?: ObjectType;
    objectId: string;
    objectType?: ObjectType;
    jsonMessage?: string;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    updatedBy?: string;
    isDeleted?: boolean;
    isArchived?: boolean;
}
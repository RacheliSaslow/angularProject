export interface Task {
    id: number;
    title: string;
    description?: string;
    status: string;
    priority: 'Low' | 'Medium' | 'High';
    projectId: number;
    createdAt: string;
}
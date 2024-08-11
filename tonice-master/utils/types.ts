// utils/types.ts.ts

export type IconProps = {
    size?: number;
    className?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    points: number;
    type: string;
    category: string;
    image: string;
    callToAction: string;
    taskData: any;
    taskStartTimestamp: Date | null;
    isCompleted: boolean;
}

export interface TaskPopupProps {
    task: Task;
    onClose: () => void;
    onUpdate: (updatedTask: Task) => void;
}
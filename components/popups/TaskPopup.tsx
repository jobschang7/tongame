// components/popups/TaskPopup.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import IceCube from '@/icons/IceCube';
import { useGameStore } from '@/utils/game-mechanics';
import { formatNumber } from '@/utils/ui';
import { imageMap } from '@/images';
import { useHydration } from '@/utils/useHydration';
import { TASK_WAIT_TIME } from '@/utils/consts';
import { useToast } from '@/contexts/ToastContext';
import { TaskPopupProps } from '@/utils/types';



const TaskPopup: React.FC<TaskPopupProps> = React.memo(({ task, onClose, onUpdate }) => {
  const showToast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const { userTelegramInitData, incrementPoints } = useGameStore();
  const isHydrated = useHydration();

  const handleStart = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tasks/update/visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initData: userTelegramInitData,
          taskId: task.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start task');
      }

      const data = await response.json();
      const updatedTask = {
        ...task,
        taskStartTimestamp: new Date(data.taskStartTimestamp),
      };
      onUpdate(updatedTask);
      showToast('Task started successfully!', 'success');
    } catch (error) {
      console.error('Error starting task:', error);
      showToast('Failed to start task. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [task, userTelegramInitData, onUpdate]);

  const handleCheck = async () => {
    setIsLoading(true);
    try {
      let response;
      if (task.type === 'VISIT') {
        response = await fetch('/api/tasks/check/visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initData: userTelegramInitData,
            taskId: task.id,
          }),
        });
      } else if (task.type === 'REFERRAL') {
        response = await fetch('/api/tasks/check/referral', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initData: userTelegramInitData,
            taskId: task.id,
          }),
        });
      } else if (task.type === 'TELEGRAM') {
        // Assuming you have a separate endpoint for Telegram tasks
        response = await fetch('/api/tasks/check/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initData: userTelegramInitData,
            taskId: task.id,
          }),
        });
      } else {
        throw new Error(`Unsupported task type: ${task.type}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to check ${task.type} task`);
      }

      const data = await response.json();

      if (data.success) {
        const updatedTask = { ...task, isCompleted: data.isCompleted };
        onUpdate(updatedTask);
        incrementPoints(updatedTask.points);
        showToast(data.message || 'Task completed successfully!', 'success');
      } else {
        // Task not completed, but no error
        if (task.type === 'REFERRAL' && data.currentReferrals !== undefined && data.requiredReferrals !== undefined) {
          const remainingReferrals = data.requiredReferrals - data.currentReferrals;
          showToast(`You need ${remainingReferrals} more referral${remainingReferrals > 1 ? 's' : ''} to complete this task. (${data.currentReferrals}/${data.requiredReferrals})`, 'error');
        } else {
          showToast(data.message || `Failed to complete ${task.type} task. Please try again.`, 'error');
        }
      }
    } catch (error) {
      console.error('Error checking task:', error);
      showToast(error instanceof Error ? error.message : `Failed to check ${task.type} task. Please try again.`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeRemaining = useCallback(() => {
    if (!task.taskStartTimestamp) return null;
    const now = new Date();
    const startTime = new Date(task.taskStartTimestamp);
    const elapsedTime = now.getTime() - startTime.getTime();
    const remainingTime = Math.max(TASK_WAIT_TIME - elapsedTime, 0);
    return remainingTime;
  }, [task.taskStartTimestamp]);

  const formatTime = useCallback((ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHydrated && task.taskStartTimestamp && !task.isCompleted) {
      intervalRef.current = setInterval(() => {
        const remaining = getTimeRemaining();
        setTimeRemaining(remaining);
        if (remaining === 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          onUpdate({ ...task });
        }
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isHydrated, task, getTimeRemaining, onUpdate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#272a2f] rounded-2xl p-6 max-w-sm w-full">
        <button onClick={onClose} className="float-right text-gray-400 hover:text-white">&times;</button>
        <Image src={imageMap[task.image]} alt={task.title} width={80} height={80} className="mx-auto mb-4" />
        <h2 className="text-3xl text-white text-center font-bold mb-2">{task.title}</h2>
        <p className="text-gray-300 text-center mb-4">{task.description}</p>
        <div className="flex justify-center mb-4">
          <button
            className="w-fit px-6 py-3 text-xl font-bold bg-blue-500 text-white rounded-2xl"
            onClick={() => {
              if (task.type === 'VISIT' && task.taskData.link) {
                window.open(task.taskData.link, '_blank');
              }
            }}
          >
            {task.callToAction}
          </button>
        </div>
        <div className="flex justify-center items-center mb-4">
          <IceCube className="w-6 h-6" />
          <span className="text-white font-bold text-2xl ml-1">+{formatNumber(task.points)}</span>
        </div>
        {task.type === 'VISIT' ? (
          <button
            className="w-full py-6 text-xl font-bold bg-green-500 text-white rounded-2xl flex items-center justify-center"
            onClick={task.taskStartTimestamp ? handleCheck : handleStart}
            disabled={isLoading || task.isCompleted}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            ) : task.isCompleted ? (
              'Completed'
            ) : task.taskStartTimestamp ? (
              isHydrated ? (timeRemaining === 0 ? 'Check' : formatTime(timeRemaining || 0)) : 'Loading...'
            ) : (
              'Start'
            )}
          </button>
        ) : (
          <button
            className="w-full py-6 text-xl font-bold bg-green-500 text-white rounded-2xl flex items-center justify-center"
            onClick={handleCheck}
            disabled={isLoading || task.isCompleted}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            ) : task.isCompleted ? (
              'Completed'
            ) : (
              'Check'
            )}
          </button>
        )}
      </div>
    </div>
  );
});

TaskPopup.displayName = 'TaskPopup';

export default TaskPopup;
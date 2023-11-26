import { DragDropContext } from 'react-beautiful-dnd';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import TaskboardItemFormModal from './TaskDetailsView';
import TaskboardCol from './TaskCol';
import { useTaskContext } from "../app/TaskContext"
import { TaskboardItemStatus, ActionTypes } from '../constants/ActionType';


const TaskboardRoot = styled.div`
  min-height: 0;
  height: 100%;
  min-width: 800px;
  max-width: 1400px;
  margin: auto;
`;

const TaskboardContent = styled.div`
  height: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
`;


function Taskboard() {

    const handleDragEnd = ({ source, destination }) => {
        // dropped outside the list
        if (!destination) {
            return;
        }
        dispatch({ type: ActionTypes.ON_TASK_DRAG, payload: { source, destination } });
    };
    const contextValue = useTaskContext();
    const [state, dispatch] = contextValue;
    const { taskList } = state
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [itemToEdit, setItemToEdit] = useState(null);

    const openTaskItemModal = (itemToEdit) => {
        setItemToEdit(itemToEdit);
        setIsModalVisible(true);
    };

    const closeTaskItemModal = () => {
        setItemToEdit(null);
        setIsModalVisible(false);
    };

    const initialValues = useMemo(
        () => ({
            title: itemToEdit?.title ?? '',
            description: itemToEdit?.description ?? '',
        }),
        [itemToEdit]
    );

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <TaskboardRoot>
                    <TaskboardContent>
                        {Object.values(TaskboardItemStatus).map((status) => (
                            <TaskboardCol
                                key={status}
                                status={status}
                                items={taskList[status]}
                                onClickAdd={
                                    status === TaskboardItemStatus.TO_DO
                                        ? () => openTaskItemModal(null)
                                        : undefined
                                }
                                onEdit={openTaskItemModal}
                                onDelete={({ itemToDelete }) => dispatch({ type: ActionTypes.DELETE_TASK_ITEM, payload: itemToDelete })}
                            />
                        ))}
                    </TaskboardContent>
                </TaskboardRoot>
            </DragDropContext>
            <TaskboardItemFormModal
                visible={isModalVisible}
                onCancel={closeTaskItemModal}
                onOk={(values) => {
                    if (!itemToEdit) {
                        dispatch({ type: ActionTypes.ADD_TASK_ITEM, payload: values });
                    } else {
                        dispatch({ type: ActionTypes.EDIT_TASK_ITEM, payload: { ...values, id: itemToEdit.id } });
                    }
                }}
                initialValues={initialValues}
            />
        </>
    );
}

export default Taskboard;

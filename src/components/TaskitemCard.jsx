import { Button, Card, Modal, Typography, Dropdown, Menu } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import styled from 'styled-components';
import BaseTooltip from '../shared/BaseTooltip';

const StyledCard = styled(Card)`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ $isDragging }) => ($isDragging ? '#fafafa' : '#fff')};
`;

const TaskboardItemCardTitle = styled(Typography.Title)`
  white-space: pre-wrap;
  margin-right: 0.25rem;
`;

const DeleteMenuItem = styled(Menu.Item)`
  color: ${red.primary};
`;

function TaskboardItemCard({ item, status, isDragging, onEdit, onDelete }) {
    return (
        <StyledCard
            $isDragging={isDragging}
            size="small"
            title={
                <BaseTooltip overlay={item.title}>
                    <span>
                        <TaskboardItemCardTitle level={5} ellipsis={{ rows: 2 }}>
                            {item.title}
                        </TaskboardItemCardTitle>
                    </span>
                </BaseTooltip>
            }
            extra={
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item icon={<EditOutlined />} onClick={() => onEdit(item)}>
                                Edit
                            </Menu.Item>
                            <DeleteMenuItem
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                    Modal.confirm({
                                        title: 'Delete?',
                                        content: `Are you sure to delete "${item.title}"?`,
                                        onOk: () =>
                                            onDelete({
                                                status,
                                                itemToDelete: item,
                                            }),
                                    })
                                }
                            >
                                Delete
                            </DeleteMenuItem>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button size="small" icon={<MoreOutlined />} />
                </Dropdown>
            }
        >
            <BaseTooltip overlay={item.description}>
                <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                    {item.description}
                </Typography.Paragraph>
            </BaseTooltip>
        </StyledCard>
    );
}

export default TaskboardItemCard;

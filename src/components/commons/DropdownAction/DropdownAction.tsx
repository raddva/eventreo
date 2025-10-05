import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
    onPressButtonDetail: () => void;
    onPressButtonDelete?: () => void;
    hideButtonDelete?: boolean;
}

const DropdownAction = ({ onPressButtonDetail, onPressButtonDelete, hideButtonDelete = false }: PropTypes) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <CiMenuKebab className="text-default-700" />
                </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Event Actions">
                <DropdownItem key="detail" onPress={() => onPressButtonDetail()}>
                    Detail
                </DropdownItem>

                {!hideButtonDelete ? (
                    <DropdownItem
                        key="delete"
                        className="text-danger-500"
                        onPress={() => onPressButtonDelete && onPressButtonDelete()}
                    >
                        Delete
                    </DropdownItem>
                ) : null}
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownAction;

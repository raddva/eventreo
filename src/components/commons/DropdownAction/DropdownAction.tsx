import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
    onPressButtonDetail: () => void;
    onPressButtonDelete: () => void;
}

const DropdownAction = (props: PropTypes) => {
    const { onPressButtonDelete, onPressButtonDetail } = props;

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <CiMenuKebab className="text-default-700" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Event Actions"
                items={[
                    { key: "detail", label: "Detail", onPress: onPressButtonDetail },
                    { key: "delete", label: "Delete", onPress: onPressButtonDelete },
                ]}
            >
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        className={item.key === "delete" ? "text-danger-500" : ""}
                        onPress={item.onPress}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown >
    )
}

export default DropdownAction;
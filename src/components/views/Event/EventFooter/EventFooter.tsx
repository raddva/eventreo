import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";

interface PropTypes {
    totalPages: number;
}

const EventFooter = (props: PropTypes) => {
    const { totalPages } = props;
    const { currentLimit, handleChangeLimit, currentPage, handleChangePage } = useChangeUrl();

    return (
        <div className="flex flex-col gap-4 items-center justify-center lg:justify-between lg:flex-row">
            <Select className="max-w-28" size="md" selectedKeys={[`${currentLimit}`]} onChange={handleChangeLimit} selectionMode="single" startContent={<p className="text-small">Show:</p>} disallowEmptySelection>
                {LIMIT_LISTS.map((item) => (
                    <SelectItem key={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            {totalPages > 1 &&
                <Pagination isCompact showControls color="primary"
                    page={Number(currentPage)} total={totalPages}
                    onChange={handleChangePage} loop />
            }
        </div>
    )
}

export default EventFooter;
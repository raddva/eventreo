import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Fragment, useEffect } from "react";
import { Skeleton } from "@heroui/skeleton";
import { Select, SelectItem } from "@heroui/select";

const EventFilter = () => {
    const { control, dataCategories, isSuccessGetCategories, setValue } = useEventFilter();
    const { handleChangeCategory, handleChangeIsFeatured, handleChangeIsOnline, currentIsFeatured, currentCategory, currentIsOnline } = useChangeUrl();

    useEffect(() => {
        if (currentCategory !== "") {
            setValue('category', `${currentCategory}`)
            setValue('isFeatured', `${currentIsFeatured}`)
            setValue('isOnline', `${currentIsOnline}`)
        }
    }, [isSuccessGetCategories]);

    return (
        <div className="h-fit w-full rounded-xl border border-gray-300 p-4 lg:sticky lg:top-20 lg:w-80">
            <h4 className="text-xl font-semibold">Filter</h4>
            <div className="mt-4 flex flex-col gap-4">

                {isSuccessGetCategories ?
                    (
                        <Fragment>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, ...field } }) => (
                                    <Autocomplete
                                        defaultItems={dataCategories?.data.data || []}
                                        {...field}
                                        label="Category"
                                        variant="bordered"
                                        defaultSelectedKey={`${currentCategory}`}
                                        onSelectionChange={(value) => {
                                            onChange(value);
                                            handleChangeCategory(value !== null ? `${value}` : "")
                                        }}
                                        labelPlacement="outside"
                                        placeholder="Search based on Category">
                                        {(category: ICategory) => (
                                            <AutocompleteItem key={`${category._id}`}>
                                                {category.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                )} />
                            <Controller
                                control={control}
                                name="isOnline"
                                render={({ field: { onChange, ...field } }) => (
                                    <Select
                                        {...field}
                                        label="Online / Offline"
                                        variant="bordered"
                                        labelPlacement="outside"
                                        placeholder="Online / Offline"
                                        defaultSelectedKeys={[`${currentIsOnline}`]}
                                        onChange={(e) => handleChangeIsOnline(e.target.value)}
                                    >
                                        <SelectItem key="true" textValue="Online">Online</SelectItem>
                                        <SelectItem key="false" textValue="Offline">Offline</SelectItem>
                                    </Select>
                                )} />

                            <Controller
                                control={control}
                                name="isFeatured"
                                render={({ field: { onChange, ...field } }) => (
                                    <Select
                                        {...field}
                                        label="Featured"
                                        variant="bordered"
                                        labelPlacement="outside"
                                        placeholder="Select Featured Events"
                                        defaultSelectedKeys={[`${currentIsFeatured}`]}
                                        onChange={(e) => handleChangeIsFeatured(e.target.value)}
                                    >
                                        <SelectItem key="true" textValue="Featured">Featured</SelectItem>
                                        <SelectItem key="false" textValue="Not Featured">Not Featured</SelectItem>
                                    </Select>
                                )} />
                        </Fragment>
                    ) : (
                        <div className="space-y-4">
                            <Skeleton className="h-14 w-full rounded-lg" />
                            <Skeleton className="h-14 w-full rounded-lg" />
                            <Skeleton className="h-14 w-full rounded-lg" />
                        </div>
                    )}
            </div>
        </div>
    )
}

export default EventFilter;
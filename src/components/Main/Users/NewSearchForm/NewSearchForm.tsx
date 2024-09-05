import { FC, memo, useEffect } from "react";
import { getUsersFilter, useAppSelector, UsersFilter } from "../../../../redux";
import { FormProvider, useForm } from "react-hook-form";
import { InputFL, SelectFL } from "../../../../utils";

type Friend = "true" | "false" | "null";
type FieldValues = {
    term: string;
    friend: Friend;
};

type UsersSearchFormProps = {
    handleFilterChanged: (filter: UsersFilter) => void
};

export const UsersSearchForm: FC<UsersSearchFormProps> = memo(({ handleFilterChanged }) => {
    const filter = useAppSelector(getUsersFilter);

    const methods = useForm<FieldValues>({ defaultValues: {term: "", friend: "null"} });

    // Resetting form values when changing filter
    useEffect(() => {
        methods.reset({
            term: filter.term,
            friend: String(filter.friend) as Friend,
        });
    }, [filter]);

    const handleFilterSubmit = (values: FieldValues) => {
        const filter: UsersFilter = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true"
        };
        handleFilterChanged(filter);
    };

    return <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFilterSubmit)}>
            <InputFL<FieldValues>
                type={"text"}
                name={"term"}
                placeholder={"search"}
            />

            <SelectFL<FieldValues> name={"friend"}>
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
            </SelectFL>

            <button type="submit" disabled={methods.formState.isSubmitting}>
                Find
            </button>
        </form>
    </FormProvider>;
});
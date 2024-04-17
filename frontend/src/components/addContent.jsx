import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddContent = ({ onAdd }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const raw = JSON.stringify(data);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            body: raw,
            redirect: "follow",
            headers: myHeaders
        };

        fetch(`${BASE_API_URL}/contents`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    reset();
                    // Aktualizuj zawartość na stronie po dodaniu nowej treści
                    onAdd();
                } else {
                    console.error("Failed to add content", response.statusText);
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="inputs">
                <input {...register("description", { required: true })} autoComplete="off" />
                {errors.title && <span>This field is required</span>}
                <input {...register("title", { required: true })} autoComplete="off" />
                {errors.title && <span>This field is required</span>}
                <input {...register("content", { required: true })} autoComplete="off" />
                {errors.title && <span>This field is required</span>}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddContent;

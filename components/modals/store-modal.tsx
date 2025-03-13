"use client";

import * as z from "zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import LoadingSpinner from "../loading-animation";

const formSchema = z.object({
    name: z.string().min(1),
});

const StoreModal = () => {
    const [loading, setLoading] = useState(false);

    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //TODO buat toko
        try {
            setLoading(true);

            const response = await axios.post("/api/stores", values);
            // window.location.assign(`/${response.data.id}`);
            console.log(response.data);
            toast.success("Berhasil membuat toko");
            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("Gagal membuat toko");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                title="Membuat Toko Baru"
                description="Tambahkan toko untuk membuat produk dan kategori"
                isOpen={storeModal.isOpen}
                onClose={storeModal.onClose}>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nama Toko"
                                                    {...field}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-6 space-x-2 flex item-center justify-end w-full">
                                    <Button
                                        variant="outline"
                                        onClick={storeModal.onClose}
                                        disabled={loading}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}>
                                        Continue
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default StoreModal;

"use client"

import React, { ChangeEvent, useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { userZod } from "@/lib/zodModel/user.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FaYoutube, FaLinkedin } from "react-icons/fa"
import { LuLoader2 } from "react-icons/lu";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from '@/lib/utils'
import { createUser } from '@/lib/action/user.action'
import { redirect, useRouter } from 'next/navigation'

interface type {
    user: { image: string, username: string, email: string, clerkId: string; };
}

const OnBoard = ({ user }: type) => {
    const [page, setPage] = useState(1)
    const { startUpload } = useUploadThing("media");
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false)
    const router = useRouter();


    const handlePage = (func: string) => {
        if (func == "increment") {
            if (page == 3) return;
            setPage(page + 1)
        } else {
            if (page == 1) return;
            setPage(page - 1)
        }
    }

    const form = useForm<z.infer<typeof userZod>>({
        resolver: zodResolver(userZod),
        defaultValues: {
            name: "",
            desc: "",
            image: user.image,
            youtube: "",
            linkedin: ""
        },
    })


    const onSubmit = async (values: z.infer<typeof userZod>) => {
        setLoading(true)

        const blob = values.image;

        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);

            if (imgRes && imgRes[0].url) {
                values.image = imgRes[0].url;
            }
        }

        await createUser({
            username: user.username,
            name: values.name,
            email: user.email,
            image: values.image,
            desc: values.desc,
            yt: values.youtube,
            lkd: values.linkedin,
            clerkId: user.clerkId,
        })

        setLoading(false);
        router.push("/dashboard")

    }

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    return (
        <div className="mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {page == 1 ? (
                        <>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full Name" {...field} />
                                        </FormControl>
                                        <FormDescription>It is visible to everyone.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-3">
                                                {field.value != "" ? (
                                                    <img src={field.value} className='w-10 h-10 rounded-full' />
                                                ) : null}
                                                <Input
                                                    type='file'
                                                    accept='image/*'
                                                    placeholder='Add profile photo'
                                                    onChange={(e) => handleImage(e, field.onChange)} />
                                            </div>
                                        </FormControl>
                                        <FormDescription>It is visible to everyone.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    ) : page == 2 ? (
                        <FormField
                            control={form.control}
                            name="desc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Something about yourself..." {...field} className='h-36 resize-none' />
                                    </FormControl>
                                    <FormDescription>Minimum of 50 characters and Maximum of 500 characters</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ) : page == 3 ?
                        (
                            <>
                                <FormField
                                    control={form.control}
                                    name="youtube"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex items-center gap-2'> <FaYoutube /> YouTube</FormLabel>
                                            <FormControl>
                                                <Input placeholder="@YourHandle" {...field} />
                                            </FormControl>
                                            <FormDescription>Example: @MrBeast</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="linkedin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex items-center gap-2'> <FaLinkedin /> LinkedIn</FormLabel>
                                            <FormControl>
                                                <Input placeholder="@YourHandle" {...field} />
                                            </FormControl>
                                            <FormDescription>Example: @MrBeast</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </>
                        ) : null}
                    <div className="pt-4 border-t border-t-slate-100 flex items-center justify-between">
                        {page != 1 ?
                            <div className="px-3 cursor-pointer py-2 bg-slate-100 text-slate-900 rounded text-sm" onClick={() => handlePage('decrement')}>Previous</div> : null}

                        {page != 3 ? <div onClick={() => handlePage('increment')} className="px-3 cursor-pointer py-2 bg-slate-900 text-slate-100 rounded text-sm ml-auto">Next</div> :
                            loading ? 
                            <Button disabled>
                                <LuLoader2 className="animate-spin mr-2"/>
                                Please wait
                            </Button> : <Button>Submit</Button>
                        }
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default OnBoard
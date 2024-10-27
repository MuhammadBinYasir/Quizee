"use client"

import { quizZod } from '@/lib/zodModel/quiz.model'

import React, { useState } from 'react'
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FaRegTrashAlt } from "react-icons/fa";
import { createQuiz, updateQuiz } from '@/lib/action/quiz.action'
import { useRouter } from "next/navigation"
import { LuLoader2 } from 'react-icons/lu'
import { revalidatePath } from 'next/cache'

const CreateQuiz = ({ user, data }: {
    user: {
        userId: string;
    },
    data?: {
        id: string;
        title: string;
        desc: string;
        category: string;
        visibility: string;
        questions: {
            question: string;
            options: string[];
            ans: string;
        }[];
    }
}) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const form = useForm<z.infer<typeof quizZod>>({
        resolver: zodResolver(quizZod),
        defaultValues: {
            title: data ? data.title : "",
            desc: data ? data.desc : "",
            category: data ? data.category : "",
            visibility: data ? data.visibility : "",
            questions: data ? data.questions : [{ question: '', options: ['', '', '', ''], ans: "1" }]
        },
    });

    const { control } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });


    const onSubmit = async (values: z.infer<typeof quizZod>) => {
        if (data) {
            setLoading(true);

            const res = await updateQuiz({
                id: data.id,
                title: values.title,
                desc: values.desc,
                category: values.category,
                visibility: values.visibility,
                questions: values.questions,
                total: values.questions.length,
                userId: user.userId
            });
            if (res === "ok") {
                router.push("/dashboard");
            }
        } else {
            setLoading(true);

            const res = await createQuiz({
                title: values.title,
                desc: values.desc,
                category: values.category,
                visibility: values.visibility,
                questions: values.questions,
                total: values.questions.length,
                userId: user.userId
            });
            if (res === "ok") {
                router.push("/dashboard");
            }
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-3 mt-2 gap-5">
                    <div className="md:col-span-2 col-span-3 space-y-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Python Quiz For Beginners" {...field} />
                                    </FormControl>
                                    <FormDescription>It must be unique and attractive.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="desc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe Your Quizzes." className="h-44 resize-none" {...field} />
                                    </FormControl>
                                    <FormDescription>Minimum 50 and Maximum 300 Characters.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-3">
                            <FormField
                                control={form.control}
                                name="visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visibility</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Visibility for Your Quiz." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="public">public</SelectItem>
                                                    <SelectItem value="private">private</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Category for Your Quiz." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="General Knowledge">General Knowledge</SelectItem>
                                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                                    <SelectItem value="Sports">Sports</SelectItem>
                                                    <SelectItem value="Technology">Technology</SelectItem>
                                                    <SelectItem value="Educational">Educational</SelectItem>
                                                    <SelectItem value="Games & Puzzles">Games & Puzzles</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>

                    <div className="md:col-span-1 col-span-3 space-y-4 max-h-[calc(100vh-64px)] overflow-auto">
                        <div
                            className='px-3 text-sm bg-primaryColor text-white rounded-md py-2 w-max cursor-pointer mt-2'
                            onClick={() => append({ question: '', options: ['', '', '', ''], ans: "1" })}>
                            Add Question
                        </div>
                        <Accordion type="single" collapsible className="w-full mt-5">
                            {fields.map((field, index) => (

                                <AccordionItem value={field.id} key={index}>
                                    <AccordionTrigger>
                                        <>
                                            {form.watch('questions')[index]?.question || "Untitled Question"}
                                            <div onClick={() => remove(index)}><FaRegTrashAlt /></div>
                                        </>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name={`questions.${index}.question`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Enter Question</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter Question.." />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div>
                                            {field.options.map((key, optionIndex) => (
                                                <div key={optionIndex} className="px-2 mt-2">
                                                    <FormField
                                                        control={form.control}
                                                        name={`questions.${index}.options.${optionIndex}`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Enter Option</FormLabel>
                                                                <FormControl>
                                                                    <Input {...field} placeholder="Enter Option.." />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                </div>
                                            ))}
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`questions.${index}.ans`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Correct Answer</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Correct Answer" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="1">{form.watch('questions')[index]?.options[0] || "Option 1"}</SelectItem>

                                                                <SelectItem value="2">{form.watch('questions')[index]?.options[1] || "Option 2"}</SelectItem>

                                                                <SelectItem value="3">{form.watch('questions')[index]?.options[2] || "Option 3"}</SelectItem>

                                                                <SelectItem value="4">{form.watch('questions')[index]?.options[3] || "Option 4"}</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </AccordionContent>
                                </AccordionItem>

                            ))}
                        </Accordion>
                    </div>

                </div>
                {loading ?
                    <Button disabled>
                        <LuLoader2 className="animate-spin mr-2" />
                        Please wait
                    </Button> : <Button>Submit</Button>
                }
            </form>
        </Form>
    )
}

export default CreateQuiz
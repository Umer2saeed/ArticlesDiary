import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import {type BreadcrumbItem, Category} from '@/types';
import {Head, Link, router, usePage} from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"

import React, {FormEventHandler, useRef, useState} from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category Update',
        href: '/categories',
    },
];

export default function CategoryEdit({ category }: { category: Category}) {
    const categoryName = useRef<HTMLInputElement>(null)

    const [name, setName] = useState<string>(category.name);
    const [description, setDescription] = useState<string>(category.description);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { errors } = usePage().props;
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const updateCategory: FormEventHandler = (e) => {
        e.preventDefault();
       router.post(route('categories.update', category.id ), {
           _method: 'put',
              name,
              description,
              image,
            forceFormData: true,
            preserveScroll: true,
       });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category Create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">

                    <form className="flex flex-col gap-6" onSubmit={updateCategory}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    ref={categoryName}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input id="image" type="file" onChange={handleFileChange} />
                                <div className="flex gap-2">
                                    { category.image != 'null' ?
                                        <img src={category.image} alt={category.name} className={"h-20 w-20 rounded-md object-cover" + (imagePreview ? 'opacity-30' : '')} /> :
                                        <img src='https://placehold.co/600x400' className={"h-20 w-20 rounded-md object-cover" + (imagePreview ? 'opacity-30' : '')}  alt={category.name}/>
                                    }
                                    {imagePreview && <img src={imagePreview} alt="Image Preview" className="h-20 w-20 rounded-md object-cover" />}
                                </div>
                                <InputError message={errors.image} />
                            </div>


                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="description">Description</Label>
                                </div>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter Description"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex">
                                <Button type="submit" className="mt-4 w-fit">
                                    Update
                                </Button>
                                <Link href={ route('categories.index') } className="ml-3 mt-4 px-4 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-md">Cancel</Link>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </AppLayout>
    );
}

import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"

import React, {FormEventHandler, useRef} from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category Create',
        href: '/categories/create',
    },
];

type CreateCategoryForm = {
    name: string;
    image: File | null;
    description: string;
};
export default function CategoryCreate() {
    const categoryName = useRef<HTMLInputElement>(null)
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm<Required<CreateCategoryForm>>({
        name: '',
        description: '',
        image: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const createCategory: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('categories.store'),{
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    categoryName.current?.focus();
                }
                setImagePreview(null);
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category Create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">

                    <form className="flex flex-col gap-6" onSubmit={createCategory}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    ref={categoryName}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter Name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                {imagePreview && <img src={imagePreview} alt="Image Preview" className="h-20 w-20 rounded-md object-cover" />}
                                <InputError message={errors.image} />
                            </div>


                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="description">Description</Label>
                                </div>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter Description"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex">
                                <Button type="submit" className="mt-4 w-fit" tabIndex={4} disabled={processing}>
                                    {processing && <LoaderCircle className="animate-spin h-4 w-4" />}
                                    Create
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

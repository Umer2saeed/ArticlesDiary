import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {Head, Link, router, usePage} from '@inertiajs/react';
import { type Category } from '@/types';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, {useEffect} from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

interface Flash {
    success?: string;
    error?: string;
}
export default function CategoryIndex({ categories }: { categories: Category[] } ) {

    const { flash } = usePage< { flash: Flash }>().props;

    useEffect(() => {
        if(flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    }

   const deleteCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('categories.destroy', { id }));
            toast.success('Category deleted successfully!');
        }
   }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('categories.create')} className="ml-3 mt-4 px-4 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-md">
                        Create Category
                    </Link>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                    <Table>
                        <TableCaption>A list of your recent posts.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead className="w-[120px]">Image</TableHead>
                                <TableHead className="w-30">Name</TableHead>
                                <TableHead className="">Description</TableHead>
                                <TableHead className="text-center">Created At</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { categories.map((category) => (
                                <TableRow>
                                    <TableCell className="font-medium">{category.id}</TableCell>
                                    <TableCell>
                                        {category.image ? <img src={'storage/'  + category.image} alt={category.name} className="h-14 w-14 rounded-full object-cover" /> : <div className="h-14 w-14 rounded-full bg-gray-200"></div> }
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description.substring(0, 65)}</TableCell>
                                    <TableCell>{formatDate(category.created_at)}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('categories.edit', category.id)} className="text-indigo-500">
                                            Edit
                                        </Link>
                                        <button onClick={() => { deleteCategory(category.id) }} className={"ml-1 text-red-600 cursor-pointer"}>
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}

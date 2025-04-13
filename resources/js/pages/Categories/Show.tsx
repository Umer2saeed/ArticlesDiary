import AppLayout from '@/layouts/app-layout';
import {type BreadcrumbItem, Category} from '@/types';
import {Head, Link} from '@inertiajs/react';
import React from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
    {
        title: 'Category View',
        href: '/categories',
    },
];

export default function CategoryEdit({ category }: { category: Category}) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category Create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className={'flex flex-col gap-3 w-[700px] mx-auto my-7'}>
                        <h1 className={'text-5xl font-bold text-center mb-4 '}>{ category.name }</h1>
                        <div className="flex justify-center">
                            <img src={category.image} alt={category.name} className="w-150 rounded-md object-cover mb-4" />
                        </div>
                        <p className={'text-left lg:text-md'}>{ category.description }</p>

                        <div className={'mt-5'}>
                            <Link href={route('categories.edit', category.id)} className="bg-transparent hover:bg-indigo-500 text-indigo-500  font-medium hover:text-white py-2 px-4 border border-indigo-500  hover:border-transparent rounded-md">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Paginator } from './Paginator';

// Component metadata
const meta: Meta<typeof Paginator> = {
    title: 'Components/Paginator',
    component: Paginator,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'A pagination component for managing the display of paginated items.'
            }
        }
    },
    argTypes: {
        totalItemsCount: {
            description: 'The total number of items to paginate.',
            control: { type: 'number' }
        },
        itemsInPage: {
            description: 'The number of items displayed per page.',
            control: { type: 'number' }
        },
        currentPage: {
            description: 'The currently active page.',
            control: { type: 'number' }
        },
        handlePageChanged: {
            description: 'Function called when the page changes.',
            action: 'Page Changed'
        },
        portionSize: {
            description: 'The number of pages displayed in a navigation block.',
            control: { type: 'number' }
        },
        responsive: {
            description:
                'Enables responsive adjustment of the number of displayed pages based on screen size.',
            control: { type: 'boolean' }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Paginator>;

// Default story
export const Default: Story = {
    args: {
        totalItemsCount: 100,
        itemsInPage: 10,
        currentPage: 1,
        portionSize: 7,
        responsive: false
    },
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(args.currentPage);

        const handlePageChanged = (page: number) => {
            setCurrentPage(page);

            args.handlePageChanged(page);
        };

        return (
            <Paginator {...args} currentPage={currentPage} handlePageChanged={handlePageChanged} />
        );
    }
};

// Responsive story
export const Responsive: Story = {
    args: {
        totalItemsCount: 100,
        itemsInPage: 10,
        currentPage: 1,
        portionSize: 7,
        responsive: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Responsive mode that adjusts the number of displayed pages based on screen size.'
            }
        }
    },
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(args.currentPage);

        const handlePageChanged = (page: number) => {
            setCurrentPage(page);
            args.handlePageChanged(page);
        };

        return (
            <Paginator {...args} currentPage={currentPage} handlePageChanged={handlePageChanged} />
        );
    }
};

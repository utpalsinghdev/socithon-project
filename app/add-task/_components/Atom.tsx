"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/table/Table";
import { $Enums, STATUS } from "@prisma/client";
import { Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
interface Task {
  id: string;
  name: string;
  location: string;
  status: $Enums.STATUS;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
interface NewTask {
  name: string;
  location: string;
  status: $Enums.STATUS;
}
interface Props {
  data: Task[];
  addTask: any;
  markComplete: any;
}
const columns = ({ markComplete }: { markComplete: any }) => [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "location",
    accessor: "location",
  },
  {
    Header: "Image",
    accessor: (d: any) => (
      <Image
        src={d.image}
        className="w-24"
        width={1920}
        height={1080}
        alt="task-image"
      />
    ),
  },
  {
    Header: "Created On",
    accessor: (d: any) => d.createdAt.toString(),
  },
  {
    Header: "status",
    accessor: "status",
  },

  {
    Header: "Action",
    accessor: "action",
    Cell: (cell: any) => {
      return (
        <button
          disabled={cell.row.original.status === STATUS.COMPLETED}
          onClick={async () => {
            await markComplete(cell.row.original.id.toString());
            toast.success("Task Status Updated Successfully !");
          }}
          className="text-sm px-2 py-0.5 disabled:text-white disabled:cursor-not-allowed bg-indigo-200 text-blue-900 rounded-md"
        >
          mark complete
        </button>
      );
    },
  },
];
const Atom = (props: Props) => {
  const { markComplete } = props;
  const [state, setState] = useState<boolean>(false);
  function renderAddModal() {
    const forms = [
      {
        type: "text",
        label: "Name",
        name: "name",
        placeHolder: "Enter Task Name",
      },
      {
        type: "text",
        name: "location",
        label: "Task Location",
        placeHolder: "Enter Task Location",
      },
      {
        type: "text",
        name: "image",
        label: "Image",
        placeHolder: "Enter Image Url",
      },
    ];
    return (
      <Modal
        open={state}
        title="Add Task"
        setOpen={() => setState((prev) => !prev)}
        className={""}
      >
        <Formik
          initialValues={{
            name: "dfadf",
            file: "dfd",
            image:
              "https://res.cloudinary.com/dedbpyhmr/image/upload/v1698165237/dirty-streets_be8n7t.jpg",
          }}
          onSubmit={async (values, action) => {
            await props.addTask(values);
            setState((prev) => !prev);
            action.setSubmitting(false);
            toast.success("Task Add Sucessfully !");
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setValues,
            values,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col px-6 space-y-2"
            >
              {forms.map((f, idx) => (
                <Input
                  type={f.type}
                  name={f.name}
                  onChange={(e: any) => {
                    handleChange(e);
                  }}
                  placeholder={f.placeHolder}
                  label={f.label}
                  key={idx}
                />
              ))}
              <div className="w-full items-center justify-end">
                <Button
                  loading={isSubmitting}
                  loadingText="Adding task.."
                  type="submit"
                  size="NORMAL"
                >
                  Save
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    );
  }
  return (
    <>
      {renderAddModal()}
      <Table
        btnText={"Add Task"}
        btnfunc={() => {
          setState((prev) => !prev);
        }}
        title="Tasks"
        subtitle={"All Tasks that are assosiate with us."}
        dataName={"Tasks"}
        data={props.data}
        columns={columns({ markComplete })}
      />
    </>
  );
};

export default Atom;

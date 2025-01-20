import { nanoid } from "nanoid";
import { useState } from "react";

type UseFieldArrayProps = {
  initialValues?: string[];
};

type Field = {
  id: string;
  value: string;
};

export const useFieldArray = ({ initialValues = [] }: UseFieldArrayProps) => {
  const initialFieldArray = initialValues.map((value) => ({
    id: generateFieldId(),
    value,
  }));

  const [fieldArray, setFieldArray] = useState<Field[]>(initialFieldArray);

  const insert = (value = "") => {
    const newField = {
      id: generateFieldId(),
      value,
    };

    setFieldArray((fields) => [...fields, newField]);
  };

  const remove = (fieldId: string) => {
    setFieldArray((fields) => fields.filter((field) => field.id !== fieldId));
  };

  const onChange =
    (fieldId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = fieldArray.map((field) => {
        if (field.id === fieldId) {
          return {
            ...field,
            value: event.target.value,
          };
        }

        return field;
      });

      setFieldArray(field);
    };

  const fields = fieldArray.map((field) => ({
    id: field.id,
    value: field.value,
    register: {
      value: field.value,
      onChange: onChange(field.id),
    },
    remove: () => remove(field.id),
  }));

  const reset = () => {
    setFieldArray(initialFieldArray);
  };

  return { insert, fields, reset };
};

const generateFieldId = nanoid;

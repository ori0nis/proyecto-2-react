import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  author?: string;
  year?: string;
  subject?: string;
  language?: string;
};

export const SearchForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      author: "",
      subject: "",
      year: "",
    },
  });
};

export function handleChange<T extends HTMLInputElement | HTMLTextAreaElement>(
  e: React.ChangeEvent<T>,
  setter: React.Dispatch<React.SetStateAction<any>>
) {
  const { name, value } = e.target;

  setter((prev: any) => ({
    ...prev,
    [name]: value,
  }));
}

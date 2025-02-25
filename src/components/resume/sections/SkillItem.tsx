import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResume } from "@/contexts/resume-context";
import { X } from "lucide-react";
import React from "react";

function SkillItem({ index }: {
    index: number;
}) {
    const { form, removeSkill } = useResume();
    return (
        <FormField
            control={form.control}
            name={`content.skills.${index}.name`}
            render={({ field }) => (
                <div className="space-y-2">
                    <div className="flex items-center bg-secondary border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 duration-300 rounded-lg py-0 pr-2 h-auto">
                        <FormControl className="flex-1">
                            <Input
                                placeholder="Enter skill"
                                className="bg-transparent border-none text-gray-100 w-auto focus-visible:ring-0 shadow-none focus-visible:ring-offset-0 min-h-full"
                                {...field}
                            />
                        </FormControl>

                        <Button
                            variant="destructive"
                            type="button"
                            size="icon"
                            onClick={() => removeSkill(index)}
                            className="w-6 h-6"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <FormMessage />
                </div>
            )}
        />
    );
}

export default SkillItem;

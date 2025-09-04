import { useState, useEffect } from "react";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconUser,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconDroplet,
  IconGenderMale,
  IconGenderFemale,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { usePatientsStore } from "@/stores/patients-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "@/apis/patients";

interface PatientFormData {
  fullName: string;
  gender: "male" | "female";
  age: string;
  bloodType: string;
  motherName: string;
  address: string;
  phone: string;
}

const initialFormData: PatientFormData = {
  fullName: "",
  gender: "male",
  age: "",
  bloodType: "",
  motherName: "",
  address: "",
  phone: "",
};

export function PatientManagement() {
  const {
    patients,
    selectedPatient,
    isLoading,
    error,
    setPatients,
    addPatient,
    updatePatient: updatePatientInStore,
    removePatient,
    selectPatient,
    setLoading,
    setError,
    clearError,
  } = usePatientsStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [searchTerm, setSearchTerm] = useState("");

  // Load patients on component mount
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      clearError();
      const response = await getPatients();
      setPatients(response.data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to load patients";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      clearError();

      if (isEditing && selectedPatient) {
        const response = await updatePatient(selectedPatient.id, formData);
        updatePatientInStore(selectedPatient.id, response.data);
      } else {
        const response = await createPatient(formData);
        addPatient(response.data);
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        `Failed to ${isEditing ? "update" : "create"} patient`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (patient: Patient) => {
    selectPatient(patient);
    setFormData({
      fullName: patient.fullName,
      gender: patient.gender,
      age: patient.age,
      bloodType: patient.bloodType,
      motherName: patient.motherName,
      address: patient.address,
      phone: patient.phone,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (patient: Patient) => {
    try {
      setLoading(true);
      clearError();
      await deletePatient(patient.id);
      removePatient(patient.id);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete patient";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    selectPatient(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const filteredPatients = (patients || []).filter(
    (patient) =>
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  const getGenderIcon = (gender: "male" | "female") => {
    return gender === "male" ? (
      <IconGenderMale className="h-4 w-4 text-blue-500" />
    ) : (
      <IconGenderFemale className="h-4 w-4 text-pink-500" />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <IconUser className="h-5 w-5" />
                Patient Management
              </CardTitle>
              <CardDescription>
                Manage patient records for phototherapy treatment
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <IconPlus className="mr-2 h-4 w-4" />
                  Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? "Edit Patient" : "Add New Patient"}
                  </DialogTitle>
                  <DialogDescription>
                    {isEditing
                      ? "Update patient information"
                      : "Enter patient details for phototherapy treatment"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value: "male" | "female") =>
                          setFormData((prev) => ({ ...prev, gender: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            age: e.target.value,
                          }))
                        }
                        placeholder="e.g., 48 hours, 3 days"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type *</Label>
                      <Input
                        id="bloodType"
                        value={formData.bloodType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            bloodType: e.target.value,
                          }))
                        }
                        placeholder="e.g., A+, O-, AB+"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherName">Mother's Name *</Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          motherName: e.target.value,
                        }))
                      }
                      placeholder="Enter mother's full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="Enter full address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDialogClose}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading
                        ? isEditing
                          ? "Updating..."
                          : "Creating..."
                        : isEditing
                        ? "Update Patient"
                        : "Create Patient"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search patients by name, mother's name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Badge variant="outline">
              {filteredPatients.length} patient
              {filteredPatients.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Info</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Medical Info</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading patients...
                  </TableCell>
                </TableRow>
              ) : filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    {searchTerm
                      ? "No patients found matching your search"
                      : "No patients added yet"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getGenderIcon(patient.gender)}
                          <span className="font-medium">
                            {patient.fullName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <IconCalendar className="h-3 w-3" />
                          {patient.age}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Mother: {patient.motherName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <IconPhone className="h-3 w-3" />
                          {patient.phone}
                        </div>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <IconMapPin className="h-3 w-3 mt-0.5" />
                          <span className="line-clamp-2">
                            {patient.address}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <IconDroplet className="h-4 w-4 text-red-500" />
                        <Badge variant="outline">{patient.bloodType}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(patient.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(patient)}
                        >
                          <IconEdit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <IconTrash className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Patient
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete{" "}
                                {patient.fullName}? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(patient)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <IconUser className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Form, FloatingLabel, Button } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import ReactQuill from 'react-quill';
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { editUser } from "../reduxtoolkit/actions/LoginAction";

const EditUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {eid} = useParams()
    const {state} = useLocation()
    const [showPass, setShowPass] = useState(false);
    const clickHandler = () => {
        setShowPass((prev) => !prev);
    }
    const animatedComponents = makeAnimated();
    const techSelectOptions = [
        { value: 'react', label: 'React' },
        { value: 'node', label: 'Node' },
        { value: 'anguler', label: 'Anguler' },
        { value: 'vue', label: 'Vue' }
    ]
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        watch,
        getValues,
        setValue,
        reset, 
    } = useForm();

    const onSubmit = (data) =>{
        const newUserData = {
            username: data.username,
            email: data.useremail,
            phone: data.userphone,
            technology: data.technology, 
            gender: data.usergender,
            status: data.userstatus,
            performance: data.performance,
            details: data.userdetails,
            fullDetails: data.userFullDetails,
            password: data.userpassword,
            notification: data.notification,
        }
        dispatch(editUser({ editData : newUserData, eid }))
        toast.success("User update successful!", {
            position: toast.POSITION.TOP_RIGHT
        })
        setTimeout(() => {
            navigate("/userloginlist")
        }, 1000);
        
    }

    //console.log('errors',errors)
    const status = watch("userstatus")
    //console.log('status => ',status)
    useEffect(() => {
        setValue("username", state.editData.username,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("useremail", state.editData.email,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("userphone", state.editData.phone,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("technology", state.editData.technology,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("usergender", state.editData.gender,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("performance", state.editData.performance,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("userstatus", state.editData.status,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("userdetails", state.editData.details,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("userFullDetails", state.editData.fullDetails,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("userpassword", state.editData.password,{ shouldValidate:true, shouldDirty:true, shouldTouch:true })
        setValue("notification", state.editData.notification,{ shouldValidate:true, shouldDirty:true, shouldTouch:true  }) 
    }, [])
    
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
            <Card body className='p-4 card_position' style={{ boxShadow: "0px 1px 7px rgb(203 203 203)" }}>
                <h4 className='mb-4 text-center'>User Login</h4>
                <Form  onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col className="mb-3">
                            <FloatingLabel  label="Name">
                                <Form.Control type="text" placeholder="Name" isInvalid={!!errors.username} {...register("username", { required: "Name is require", minLength:{value: 3, message: "Minimum 3 characters required"}} )} error={Boolean(errors.username?.message)} />
                                {errors.username?.message && <span className='text-danger'>{errors.username?.message}</span>}
                            </FloatingLabel>
                           
                        </Col>
                        <Col  className="mb-3">
                        <FloatingLabel className="mb-3" label="Email">
                                <Form.Control type="email" placeholder="Email" isInvalid={!!errors.useremail} {...register("useremail", {
                                    required: "Email is require", pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Email is not vaild" }})} error={errors.useremail?.message} />
                                {errors.useremail?.message && <small className='text-danger'>{errors.useremail?.message}</small>}
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel className="mb-3" label="Phone">
                                <Form.Control type="number" placeholder="Phone" isInvalid={!!errors.userphone} {...register("userphone",{required: "Phone is require", minLength:{value:10, message: "Minimum 10 digit enter"}, maxLength:{value:12, message:"Maximum 12 digit enter"}})} />  
                                {errors.userphone?.message && <small className='text-danger'>{errors.userphone?.message}</small>}
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingSelect" label="Gender">
                                <Form.Select aria-label="Floating label select example" isInvalid={!!errors.usergender} {...register("usergender",{required: "Gender select is require"})}>
                                <option value="">--Select Gender--</option>
                                <option value="male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                </Form.Select>
                                {errors.usergender?.message && <small className='text-danger'>{errors.usergender?.message}</small>}
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Controller control={control} name="technology"  rules={{required:"Select Technology"}} render={({ field: { onChange, onBlur, value, name, ref } })=>(
                                <Form.Group className='my-2'>
                                <Form.Label>Technology</Form.Label>
                                <Select isMulti options={techSelectOptions} components={animatedComponents}  isInvalid={!!errors.technology}  name={name} ref={ref} onChange={onChange} onBlur={onBlur} value={value} />
                                {errors.technology?.message && <small className='text-danger'>{errors.technology?.message}</small>}
                                
                            </Form.Group>
                             )}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3">
                        <Form.Group className='my-2' isInvalid={!!errors.performance}>
                            <Form.Label>Performance</Form.Label><br />
                            <Form.Check
                                inline
                                id="inline-check-1"
                                label="Good"                            
                                value="good"
                                type="radio"
                                {...register("performance", {
                                    required: "Please select performance",
                                  })}
                            />
                            <Form.Check
                                inline
                                id="inline-check-2"
                                label="Better"
                                name="better"
                                value="better"
                                type="radio"
                                {...register("performance", {
                                    required: "Please Select Gender",
                                  })}
                            />
                            <Form.Check
                                inline
                                id="inline-check-3"
                                label="Best"
                                name="best"
                                value="best"
                                type="radio"
                                {...register("performance", {
                                    required: "Please Select Gender",
                                  })}
                            />
                            <br/>{errors.performance?.message && <small className='text-danger'>{errors.performance?.message}</small>}
                        </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='my-2'>
                                <Form.Label> User Status</Form.Label><br />
                                <Form.Check
                                    inline
                                    label={status ? "Active" : "Inctive"}
                                    name="status"
                                    type="checkbox"
                                    id="inline-checkbox-1"
                                    {...register("userstatus")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-3">
                                <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }} isInvalid={!!errors.userdetails} {...register("userdetails",{required: "User details is require"})}
                                />
                                {errors.userdetails?.message && <small className='text-danger'>{errors.userdetails?.message}</small>}
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-3'>
                        <Controller control={control} name="userFullDetails" rules={{required:"User full details require"}}  render={({ field: { onChange, onBlur, value, name, ref } })=>(
                            <ReactQuill theme="snow" className='qEditorH' name={name} ref={ref} onChange={onChange} onBlur={onBlur} value={value} />
                             )}/>
                            {errors.userFullDetails?.message && <small className='text-danger'>{errors.userFullDetails?.message}</small>}
                            
                        </Col>
                    </Row>
                    
                    <FloatingLabel className="mb-3" label="Password" >
                    <Form.Control type={showPass ? "text" : "password"}  isInvalid={!!errors.userpassword} placeholder="Password"  {...register("userpassword", { required: "Password is require", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, message: "Password at least 6 character" } })} error={errors.userpassword?.message} />
                    {showPass ? <FaRegEye className='eye' onClick={clickHandler} /> : <FaRegEyeSlash className='eye_close' onClick={clickHandler} />}
                    {errors.userpassword?.message && <small className='text-danger'>{errors.userpassword?.message}</small>}
                </FloatingLabel>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Send me updated notification"
                    {...register("notification")}
                />

                    <Button
                        type="submit"
                        className="mt-4 mx-2"
                        variant="primary"
                    >
                        Update
                    </Button>
                    <Link to="/userloginlist" className="mt-4 mx-2 btn btn-secondary">
                        Go Back
                    </Link>
                </Form>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser
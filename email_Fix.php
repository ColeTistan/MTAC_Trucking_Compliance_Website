<?php
    $statusMsg = '';
    $alertType = '';

    if(filter_has_var(INPUT_POST, 'submit')) {
        $name    = htmlspecialchars($_POST['name']);
        $email   = htmlspecialchars($_POST['email']);
        $subject = htmlspecialchars($_POST['subject']);
        $message = htmlspecialchars($_POST['message']);

        if(!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
            //success status
            if(filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
                //fail status - invalid email
                $statusMsg = 'Please enter a valid email address';
                $alertType = 'alert-danger';
            } else {
                //email 
                $emailTo   = 'mtactruckingcompliance@gmail.com';
                $body      = '<h4>Name</h4><p>' . $name . '</p>
                              <h4>Email</h4><p>' . $email . '</p>
                              <h4>Message</h4><p>' . $message . '</p>';

                //Email headers
                $headers   = "MIME-Version: 1.0" . "\r\n";
                $headers  .= "Content-Type:text/html;charset=UTF-8" . "\r\n";

                //additional headers
                $headers  .= "From: " . $name . "<" . $email . ">" . "\r\n";

                //email successfully sent or failed
                if(mail($emailTo, $subject, $body, $headers)) {
                    //successfully sent
                    $statusMsg = 'Email successfully sent';
                    $alertType = 'alert-success';
                } else {
                    $statusMsg = 'Email could not be sent';
                    $alertType = 'alert-danger';
                }
            }
        } else {
            //fail status
            $statusMsg = 'Please fill in all required fields';
            $alertType = 'alert-danger'; 
        }
    }
?>

<!-- contact information box -->
<div class="container">
    <!--Contact Title heading-->
        <h2 class="font-weight-bold text-center">Contact us</h2>
        <br>
        <div class="row">
            <!--Grid column-->
            <div class="col-md-9 mb-md-0 mb-5">
    
                <form id="contact-form" name="contact-form"
                      action=" <?php echo $_SERVER['PHP_SELF']; ?> " method="POST">

                    <!--Grid row-->
                    <div class="row">

                        <!--Grid column-->
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <input type="text" id="name" name="name" 
                                       class="form-control" placeholder="John Doe"
                                       value="<?php echo isset($_POST['name']) ? $name : ''; ?>">
                                <label for="name">Your name</label>
                            </div>
                        </div>
                        <!--Grid column-->

                        <!--Grid column-->
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <input type="text" id="email" name="email" 
                                       class="form-control" placeholder="doej@gmail.com"
                                       value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
                                <label for="email">Your email</label>
                            </div>
                        </div>
                        <!--Grid column-->

                        <!--Grid column-->
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <input type="text" id="subject" name="subject" 
                                       class="form-control" placeholder="Question about company"
                                       value="<?php echo isset($_POST['subject']) ? $subject : ''; ?>">
                                <label for="name">Subject</label>
                            </div>
                        </div>
                        <!--Grid column-->
                    </div>
                    <!--Grid row-->
                    
                    <!--Grid row-->
                    <div class="row">

                        <!--Grid column-->
                        <div class="col-md-12">

                            <div class="md-form">
                                <textarea type="text" id="message" name="message"
                                          rows="5" class="form-control md-textarea"
                                          placeholder="Nice to meet you!"
                                          value="<?php echo isset($_POST['message']) ? $message : ''; ?>"></textarea>
                                <label for="message">Your message</label>
                            </div>

                        </div>
                    </div>
                    <!--Grid row-->
                    <div class="text-center text-md-left">
                        <button type="submit" name="submit" class="btn btn-primary">Submit</button>        
                    </div>
                </form>
                <?php if($statusMsg != ''): ?>
                    <br><div class="alert <?php echo $alertType; ?>"> <?php echo $statusMsg; ?> </div>
                <?php endif; ?>
            </div>
            </div>
    </div>
            <!--Grid column-->
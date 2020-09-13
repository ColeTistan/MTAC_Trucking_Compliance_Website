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

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="shortcut icon"  type="image/png" href="../images/favicon.ico">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - M-Tac Trucking Compliance</title>
</head>
<body>
<!-- start header -->
<header class="header">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark text-center">
        <a href="index.html"><img id="company-logo" src="../images/company_logo.png"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content">
            <span class="navbar-toggler-icon"></span>
        </button>
        <h6 style="margin-bottom: 0px;" class="navbar-text">
            Our Goal is providing Guidance and Solutions to ensure your Carrier’s USDOT Compliance and Safety.
        </h6>
        <div class="collapse navbar-collapse" id="navbar-content">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">
                        Home
                    </a>
                </li>
                <li class="nav-item">
                    <a href="about.html" class="nav-link">
                        About Us
                    </a>
                </li>
                <li class="nav-item">
                    <a href="service.html" class="nav-link">
                        Services
                    </a>
                </li>
                <li class="nav-item">
                    <a href="links.html" class="nav-link">
                        Links
                    </a>
                </li>
                <li class="nav-item active">
                    <a href="contact.php" class="nav-link">
                        Contact Us
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</header>
<!-- end header -->
<br>
<!-- start main -->
<main>

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
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-md-3 text-center">
                <ul class="list-unstyled mb-0">
                    <li><i class="fas fa-map-marker-alt fa-2x"></i>
                        <p>Address: P.O. Box 1118, Mullica Hill NJ 08062</p>
                    </li>

                    <li><i class="fas fa-phone mt-4 fa-2x"></i>
                        <p>(856) 430-0197</p>
                    </li>

                    <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                        <p>mtactruckingcompliance@gmail.com</p>
                    </li>
                </ul>
            </div>
            <!--Grid column-->

        </div>
    </div>
</main>
<!-- end main -->

<br>
<hr>
<!-- start Footer - Bootstrap 4 -->
<footer class="page-footer font-small blue pt-4">

    <!-- Footer Links -->
    <div class="container-fluid text-center text-md-left">
  
      <!-- Grid row -->
      <div class="row">
  
        <!-- Grid column -->
        <div class="col-md-6 mt-md-0 mt-3">
  
          <!-- Content -->
          <h5 class="text-uppercase">M-Tac Trucking Compliance, LLC</h5>
          <ul class="list-unstyled">
            <li>
                Address: P.O. Box 1118, Mullica Hill NJ 08062
            </li>
            <li>
                Cell: (856) 430-0197
            </li>
            <li>
                Email: mtactruckingcompliance@gmail.com
            </li>
          </ul>
        </div>
        <!-- Grid column -->
  
        <hr class="clearfix w-100 d-md-none pb-3">
  
        <!-- Grid column -->
        <div class="col-md-3 mb-md-0 mb-3">
  
          <!-- Links -->
          <h5 class="text-uppercase">Page Links</h5>
  
          <ul class="list-unstyled">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="about.html">About Us</a>
            </li>
            <li>
              <a href="service.html">Services</a>
            </li>
            <li>
              <a href="links.html">Links</a>
            </li>
            <li>
              <a href="contact.php">Contact</a>
            </li>
          </ul>
  
        </div>
        <!-- Grid column -->
  
        <!-- Grid column -->
        <div class="col-md-3 mb-md-0 mb-3">
  
          <!-- Links -->
          <h5 class="text-uppercase">Useful Links</h5>
  
          <ul class="list-unstyled">
            <li>
                <a href="https://www.fmcsa.dot.gov/">
                    US DOT | FMCSA
                </a>
            </li>
            <li>
                <a href="https://clearinghouse.fmcsa.dot.gov/">
                    Drug and Alcohol Clearinghouse (DACH)
                </a>
            </li>
            <li>
                <a href="https://ai.fmcsa.dot.gov/SMS">
                    Safety Management System (SMS)
                </a>
            </li>
            <li>
                <a href="https://www.ecfr.gov/cgi-bin/text-idx?SID=43ccae11163517128af67b5df6f8fb9c&mc=true&tpl=/ecfrbrowse/Title49/49cfrv5_02.tpl#0">
                    Electronic Code of Federal Regulation (ECFR)
                </a>
            </li>
            <li>
                <a href="https://www.state.nj.us/mvc/">
                    NJ Motor Vehicle Commission
                </a>
            </li>
            <li>
                <a href="https://www.penndot.gov/Pages/default.aspx">
                    PA DOT
                </a>
            </li>
            <li>
                <a href="https://www.dmv.de.gov/">
                    DE DMV
                </a>
            </li>
            <li>
                <a href="https://www.njsp.org/">
                    NJ State Police
                </a>
            </li>
          </ul>
  
        </div>
        <!-- Grid column -->
  
      </div>
      <!-- Grid row -->
  
    </div>
    <!-- Footer Links -->
  
    <!-- Hit counter -->
    <div class="powr-hit-counter" id="d0465e39_1598232449"></div>
    <script src="https://www.powr.io/powr.js?platform=bootstrap?"></script>
    <!-- Hit counter -->

    <!-- Copyright -->
    <div class="footer-copyright text-center py-3">
        Copyright &copy; M-Tac Trucking Compliance, LLC | All Rights Reserved
    </div>
    <!-- Copyright -->
  
  </footer>
  <!-- end Footer - Bootstrap 4 -->
</body>
</html>
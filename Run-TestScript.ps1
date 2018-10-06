# declare variables
$errors = New-Object System.Collections.ArrayList
$starturl = "http://sdev460discussion4.s3-website-us-east-1.amazonaws.com/";
$unsafe_input = "javascript:window.location.replace('https://giphy.com/gifs/the-magic-word-3ohzdQ1IynzclJldUQ/fullscreen');"

function CheckForRedirect {
  param (
    $Checkurl,
    $ElementName
  )
  if ($Checkurl -eq $starturl) {
    Write-Host -ForegroundColor Green "[$ElementName] We haven't haven't been redirected"
  }
  else {
    Write-Host -ForegroundColor Red "[$ElementName] We have been  ... let the panic begin"
    $errors.Add("[$ElementName]:REDIRECT") > $null
  }
  return 
}

# initialize browser
$ie = New-Object -ComObject 'InternetExplorer.Application';
$ie.Visible = $true;
$ie.Navigate($starturl);
while ($ie.Busy -eq $true) { Start-Sleep 1 }    #wait for browser idle
# get the submit button
$submit = $ie.Document.getElementById("submit")


# get safe input element
$safe = ($ie.Document.getElementsByName("xss_safe") | Select-Object -First 1)
$safe.value = $unsafe_input;

$submit.click()

while ($ie.Busy -eq $true) { Start-Sleep -Seconds 1; }    #wait for browser idle

# test by clicking "safe" link and checking for redirect
$safeLink = $ie.Document.getElementById("safe")
$safeLink.click()

while ($ie.Busy -eq $true) { Start-Sleep -Seconds 1; }    #wait for browser idle
CheckForRedirect -Checkurl $ie.LocationURL() -ElementName "xss_safe"

while ($ie.Busy -eq $true) { Start-Sleep -Seconds 1; }    #wait for browser idle

# get unsafe input element
$unsafe = $ie.Document.getElementById("xss_not_safe") 
$unsafe.value = $unsafe_input

$submit = $ie.Document.getElementById("submit")
$submit.click()

# test by clicking "unsafe" link and checking for redirect
$unsafeLink = $ie.Document.getElementById("unsafe")
$unsafeLink.click()

while ($ie.Busy -eq $true) { Start-Sleep -Seconds 1; }    #wait for browser idle
CheckForRedirect -Checkurl $ie.LocationURL() -ElementName "xss_not_safe"

# check if errors have been logged and return if test passed
$testPassed = if (!$errors.Count -gt 0) {$true} else {$false}
return $testPassed

<script>
var base_url = "<?= base_url() ?>";

</script>
<footer class="footer text-center"> 2017 &copy; Myadmin brought to you by wrappixel.com </footer>
</div>
<?php
  foreach ($js as $key => $value) {
      printf("<script src='%s'></script>\n",$value);;
  }
?>
<script>
$(document).ready(function() {
    $('table').DataTable();
});
</script>
</body>

</html>

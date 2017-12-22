

    <!-------------------------------->
    <!-- Footer                     -->
    <!-------------------------------->
		<footer class="footer-distributed">
			<div class="footer-left">
				<h3>Karya Sirap<span> Samarinda</span></h3>
				<p class="footer-links">
					<a href="#">Home</a>
					·
					<a href="#">About Us</a>
					·
					<a href="#">Produk</a>
					·
					<a href="#">Galeri</a>
					·
					<a href="#">Kontak</a>
				</p>
				<p class="footer-company-name">PIBS &copy; 2016</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>Jl.Sederhana</span> Bandung, Jawa Barat</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>081314376531</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">karyasirapsamarinda@gmail.com</a></p>
				</div>
			</div>
			<div class="footer-right">
				<p class="footer-company-about">
					<span>About the company</span>
					Atap Sirap adalah atap kayu yang dikenal kuat dan juga artistik, yang terbuat dari lembaran-lembaran kayu pilihan.
				</p>

				<div class="footer-icons">

					<a href="#"><i class="fa fa-facebook"></i></a>
					<a href="#"><i class="fa fa-twitter"></i></a>
					<a href="#"><i class="fa fa-linkedin"></i></a>
					<a href="#"><i class="fa fa-github"></i></a>

				</div>

			</div>

		</footer>
    <!-------------------------------->
    <!-- //Footer                     -->
    <!-------------------------------->




    <?php
      foreach ($js as $key => $value) {
          printf("<script src='%s'></script>\n",$value);;
      }
    ?>
    <script>
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    })
    </script>

</body>

</html>

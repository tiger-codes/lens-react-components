from setuptools import setup

exec (open('lens_components/version.py').read())

setup(
    name='lens_components',
    version=__version__,
    author='',
    packages=['lens_components'],
    include_package_data=True,
    license='MIT',
    description='Dash UI component suite',
    install_requires=[]
)
